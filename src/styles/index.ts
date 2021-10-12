// eslint-disable-next-line import/no-anonymous-default-export
export default {
  appContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabsContainer: {
    fontWeight: "bold",
    border: "1px solid #CCCCCC",
    borderRadius: 5,
    padding: "60px 50px",
  },
  checkbox: {
    fontSize: 22,
  },
  notPayedInv: {
    display: "flex",
    alignItems: "center",
    margin: "15px 0px",
  },
  notPayedInv_1: {
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notPayedInv_2: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  notPayedInv_2_1: {
    padding: 0,
    fontSize: 13,
  },
  notPayedInv_2_2: {
    padding: 0,
    fontSize: 12,
    color: "#999999",
    fontStyle: "italic",
    fontWeight: "normal",
  },
  notPayedInv_3: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    flex: 1,
    color: "#1DA57A",
    marginLeft: 15,
  },
  notPayedInv_3_1: {
    padding: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 13,
  },
  notPayedInv_3_2: {
    padding: 0,
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "normal",
  },
  notPayedInv_4: {
    fontSize: 13,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  notPayedInv_4_1: {},
  notPayedInv_4_2: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#999999",
  },
  payment: {
    display: "flex",
    justifyContent: "flex-end",
  },
  paymentButton: {
    padding: "11px 33px",
    backgroundColor: "#1DA57A",
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
    border: "none",
    cursor: "pointer",
  },
  adContainer: {
    display: "flex",
    alignItems: "center",
    margin: 20,
  },
  ad: {
    fontStyle: "italic",
    fontSize: 12,
  },
  //
  //
  // modal
  //
  modalPage: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.7,
    position: "absolute",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  modalContainer: {
    border: "1px solid black",
    backgroundColor: "white",
    width: "100%",
    cursor: "pointer",
  },
  titleModal: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: "39px",
    margin: "20px 0",
  },
  subtitleModal: {
    backgroundColor: "#EEEEEE",
    textAlign: "center",
    padding: "9px 0",
    fontSize: "12px",
    margin: "30px 0px",
  },
  formModal: {
    width: "100%",
  },
  groupInputsModal: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  relationLabelInput: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    cursor: "pointer",
  },
  groupInputModal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    flex: 1,
    cursor: "pointer",
  },
  inputModal: {
    padding: "8px 10px",
    fontSize: 13,
    marginTop: 6,
    cursor: "pointer",
  },
  labelModal: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  requiredStar: {
    color: "red",
    margin: "0px 3px",
  },
};
