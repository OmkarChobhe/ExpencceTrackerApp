import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { Modal, Form, Select, message, Table, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAllTransactions } from "../redux/expenseSlice.jsx";
import Spinner from "../components/Spinner.jsx";
import Analytics from "../components/Analytics.jsx";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory.js";
import {BASE_URL} from '../services/Helper.js'

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // for edit modal
  const [loading, setLoading] = useState(false);
  const [loadingCenterSpinner, setLoadingCenterSpinner] = useState(false); // for center spinner
  const [frequency, setFrequency] = useState("7");
  const [form] = Form.useForm(); // useform it is use for reset form data aftyer evry transaction
  const [selectedDate, setSelectedDate] = useState({});
  const [type, setType] = useState("all"); // expense and income filter
  const [viewData, setViewData] = useState("table"); // for view data
  const [editable, setEditable] = useState(null); // for edit data

  ///////////////////////////////////////////////////////////////////////////
  // for showing transaction count per page
  const paginationOptions = {
    pageSize: 5,
    showSizeChanger: false,
  };

  const tableScrollOptions = {
    x: "max-content", // Set the width to 'max-content' to allow horizontal scrolling
  };
  ///////////////////////////////////////////////////////////////////////////
  const { loadingSpinner, allTransactions } = useSelector(
    (state) => state.expense
  );
  const dispatch = useDispatch();

  const columns = [
    {
      title: <b>Date</b>,
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <b>
          {" "}
          <span>{moment(text).format("YYYY-MM-DD")}</span>
        </b>
      ),
    },
    {
      title: <b>Amount ₹</b>,
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => ({
        props: {
          style: {
            background: record.type === "expense" ? "	#FFDAB9" : "	#98FB98",
          },
        },
        children: (
          <b>
            <span
              className={`${
                record.type === "expense"
                  ? "price-text-red"
                  : "price-text-green"
              } ${record.type === "expense" ? "expense-amount" : ""}`}
            >
              <span className="text-dark">
                {record.type === "expense" ? "- ₹" : "+₹"}
              </span>
              {text}
            </span>
          </b>
        ),
      }),
    },

    {
      title: <b>Type</b>,
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <b>
          <span
            className="text-capitalize"
            style={{ color: text === "expense" ? "red" : "lime" }}
          >
            {text}
          </span>
        </b>
      ),
    },
    {
      title: <b>Category</b>,
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <b>
          <span className="text-capitalize">{text}</span>
        </b>
      ),
    },

    {
      title: <b>Description</b>,
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="text-capitalize">{text}</span>,
    },
    // {
    //     title: 'Reference',
    //     dataIndex: 'reference',
    //     key: 'reference',
    // },
    {
      title: <b>Actions</b>,
      render: (text, record) => (
        <div className="d-flex gap-3">
          <EditOutlined
            className="text-primary "
            onClick={() => {
              setEditable(record);
              setShowEditModal(true);
            }}
          />
          <DeleteOutlined
            className="text-danger"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (editable !== null) {
      setShowEditModal(true);
      // Set initial form values here using the editable object
      form.setFieldsValue({
        amount: editable.amount,
        type: editable.type,
        category: editable.category,
        date: moment(editable.date).format("YYYY-MM-DD"),
        description: editable.description,
        // Add other fields as needed
      });
    }
  }, [editable]);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        setLoadingCenterSpinner(true);
        const res = await axios.post(
          `${BASE_URL}api/v1/transactions/get-transaction`,
          {
            userid: user._id,
            frequency,
            selectedDate,
            type,
          }
        );
        // console.log(selectedDate);
        setLoadingCenterSpinner(false);
        setLoading(false);
        dispatch(setAllTransactions(res.data));
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch transactions");
      }
    };

    getAllTransactions();
  }, [frequency, selectedDate, type]);
  // table data

  // Delete transaction
  const handleDelete = async (record) => {
    try {
      setLoadingCenterSpinner(true);
      await axios.post(
       ` ${BASE_URL}api/v1/transactions/delete-transaction`,
        { transactionId: record._id }
      );
      setLoadingCenterSpinner(false);
      message.success("Transaction Deleted Successfully");
    

      // Fetch updated transactions after a successful deletion
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
       ` ${BASE_URL}api/v1/transactions/get-transaction`,
        {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        }
      );
   
      dispatch(setAllTransactions(res.data));
    } catch (error) {
      console.log(error);
      setLoadingCenterSpinner(false);
      message.error("Unable to Delete");
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      setLoadingCenterSpinner(true);
      if (editable) {
        await axios.post(
          `${BASE_URL}api/v1/transactions/edit-transaction`,
          {
            payload: { ...values, userid: user._id },
            transactionId: editable._id,
          }
        );
        setLoading(false);
        setLoadingCenterSpinner(false);
        setShowEditModal(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post(
          `${BASE_URL}api/v1/transactions/add-transaction`,
          { ...values, userid: user._id }
        );
        setLoading(false);
        setLoadingCenterSpinner(false);
        message.success("Transaction Added Successfully");
        console.log('BaseUrl: ', BASE_URL)
      }
      setShowModal(false);
     
      form.resetFields(); // reset form data aftyer evry transaction
      // Fetch updated transactions after a successful transaction addition
      const res = await axios.post(
        `${BASE_URL}api/v1/transactions/get-transaction`,
        {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        }
      );
      dispatch(setAllTransactions(res.data));
    } catch (error) {
      message.error("Failed to Add Transaction");
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setLoading(false);
    form.resetFields(); // reset form data aftyer evry transaction
  };

  const handleEditModalCancel = () => {
 
    setEditable(null);
    setLoading(false);
    form.resetFields(); // reset form data after every transaction
    form.setFieldsValue({
      amount: undefined,
      type: undefined,
      category: undefined,
      date: undefined,
      description: undefined,
    });
    setShowEditModal(false);
  };

  return (
    <Layout>
      <div
        className="d-flex flex-column justify-content-center"
        style={{ width: "100%" }}
      >
        {/* Filter Start End */}
        <div className="filters bx-sd3">
          <div>
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
              style={{ width: "8rem" }}
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>

          <div>
            <h6>Select Type</h6>
            <Select
              value={type}
              onChange={(values) => setType(values)}
              style={{ width: "6rem" }}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>

          {/* chart filters */}
          <div className="mx-2 text-white border border-white p-2 rounded">
            <UnorderedListOutlined
              className={`mx-2 fs-3 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 fs-3 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>

          <div>
            <button
              className="btn btn-primary text-white "
              onClick={() => setShowModal(true)}
            >
              Add New
            </button>
          </div>
        </div>
        {/* Filter Div End */}

        {/* showng  all data in table  */}
        {loadingCenterSpinner ? (
          <Spinner />
        ) : (
          <div
            className="container-fluid content mt-3  "
            style={{ width: "100%" }}
          >
            {viewData == "table" ? (
              <Table
                columns={columns}
                dataSource={allTransactions}
                bordered
                style={{ overflow: "hidden", overflowX: "auto" }}
                pagination={paginationOptions}
                scroll={tableScrollOptions}
              />
            ) : (
              <Analytics allTransactions={allTransactions} />
            )}
          </div>
        )}
        {/* showng  all data in table end  */}

        {/* Start Model */}
        <Modal
          title="Add Transaction"
          open={showModal}
          onCancel={handleModalCancel}
          footer={false}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name="amount" required>
              <input type="number" className="form-control" required />
            </Form.Item>
            <Form.Item label="Type" name="type" required>
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category" required>
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="freeLance">Freelance</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="grocery">Grocery</Select.Option>
                <Select.Option value="shopping">Shopping</Select.Option>
                <Select.Option value="travel">Travel</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date" required>
              <input type="date" className="form-control" required />
            </Form.Item>
            <Form.Item label="Description (Optional)" name="description">
              <input type="text" className="form-control" />
            </Form.Item>
            {/* <Form.Item label="Reference" name="reference">
          <input type="text" className="form-control" />
        </Form.Item> */}

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                <span
                  className={loading ? "spinner-border spinner-border-sm" : " "}
                  role="status"
                  aria-hidden="true"
                />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </Form>
        </Modal>
        {/* End Model */}

        {/* Start Edit Model */}
        <Modal
          title="Edit Transaction"
          open={showEditModal}
          onCancel={handleEditModalCancel}
          footer={false}
        >
          {/* Create a new form for editing transactions */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item label="Amount" name="amount" required>
              <input type="number" className="form-control" required />
            </Form.Item>
            <Form.Item label="Type" name="type" required>
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category" required>
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="freeLance">Freelance</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="grocery">Grocery</Select.Option>
                <Select.Option value="shopping">Shopping</Select.Option>
                <Select.Option value="travel">Travel</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date" required>
              <input type="date" className="form-control" required />
            </Form.Item>
            <Form.Item label="Description (Optional)" name="description">
              <input type="text" className="form-control" />
            </Form.Item>
            {/* <Form.Item label="Reference" name="reference">
          <input type="text" className="form-control" />
        </Form.Item> */}

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                <span
                  className={loading ? "spinner-border spinner-border-sm" : " "}
                  role="status"
                  aria-hidden="true"
                />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </Form>
        </Modal>
        {/* End Edit Model */}
      </div>
    </Layout>
  );
};

export default Homepage;

// Ant Design table cell Color

// {
//   title: <b>Amount ₹</b>,
//   dataIndex: 'amount',
//   key: 'amount',
//   render: (text, record) => ({
//     props: {
//       style: { background: parseInt(text) > 50 ? 'red' : 'green' },
//     },
//     children: <div>{text}</div>,
//   }),
// },
