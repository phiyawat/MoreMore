import { database } from "../firebase";
import axios from "axios";
import {
  GET_BEST_SELLER,
  FIND_DATA_WITH_NAME,
  FIND_PDF_WITH_NAME,
  GET_ALL_PRODUCT,
  RESET
} from "./type";

export function getBestSeller() {
  return dispatch => {
    const docRef = database.collection("bestSellerProduct");
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: GET_BEST_SELLER,
          sheetName: doc.data().name,
          prices: doc.data().price,
          shortDetail: doc.data().short_detail,
          shopName: doc.data().profile
        });
      });
    });
  };
}

export function findDataWithNameOfProduct(name) {
  return dispatch => {
    const docRef = database.collection("product").doc(name);
    const imageRef = database.collection("image").doc(name);
    docRef.get().then(doc => {
      imageRef.get().then(doc2 => {
        dispatch({
          type: FIND_DATA_WITH_NAME,
          price: doc.data().price,
          longDetail: doc.data().longDetail,
          img: doc2.data().image
        });
      });
    });
  };
}

export function getAllProduct() {
  return dispatch => {
    const docRef = database.collection("product");
    const imageRef = database.collection("image");
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        imageRef
          .doc(doc.id)
          .get()
          .then(doc2 => {
            dispatch({
              type: GET_ALL_PRODUCT,
              name: doc.id,
              hiLight: doc.data().hiLight,
              price: doc.data().price,
              profile: doc.data().profile,
              img: doc2.data().image
            });
          });
      });
    });
  };
}

export function findPdfWithNameOfProduct(name) {
  return dispatch => {
    const docRef = database.collection("file").doc(name);
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: FIND_PDF_WITH_NAME,
          pdfFile: doc.data().pdf
        });
      });
    });
  };
}

export function reset() {
  return dispatch => {
    dispatch({
      type: RESET
    });
  };
}

export function createSheetforUser(Email, sheetName, pdfFile) {
  if (pdfFile === "") {
    return;
  }
  const docRef = database.collection("payment").doc();
  docRef
    .set({
      email: Email,
      pdf: pdfFile,
      name: sheetName
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function createCardWithToken(
  cardNumber,
  nameOnCard,
  expiryDate,
  securityCode,
  totalPrice
) {
  var expiryDateSplit = expiryDate.split("/");
  var year = parseInt(expiryDateSplit[1], 10) + 2000;
  var data = {
    number: cardNumber,
    name: nameOnCard,
    expireMonth: expiryDateSplit[0],
    expireYear: year,
    code: securityCode,
    prices: totalPrice * 100
  };
  axios.post("http://localhost:8080/", data).then(function(response) {
    chargesWithToken(response.data.id, data.prices);
  });
}

function chargesWithToken(token, price) {
  var data = {
    tokens: token,
    prices: price
  };
  axios.post("http://localhost:8080/charges", data).then(function(response) {
    console.log(response);
  });
}
