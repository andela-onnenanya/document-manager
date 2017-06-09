/* global Materialize */
import ajaxCall from 'axios';
import actionTypes from '../constants/actionTypes';


export const createDocumentSuccess = createdDocument =>
  ({ type: actionTypes.CREATE_DOCUMENT_SUCCESS, createdDocument });

export const createDocumentFailure = () =>
  ({ type: actionTypes.CREATE_DOCUMENT_FAILURE });

export const createDocument = documentData =>
  dispatch =>
    ajaxCall.post('/documents', documentData)
      .then((response) => {
        dispatch(createDocumentSuccess(response.data));
        Materialize.toast(
          'Document Saved',
          3000
        );
      })
      .catch((error) => {
        dispatch(createDocumentFailure());
        Materialize.toast(error.response.data.message, 3000);
      });

export const getAllDocumentsSuccess = documents =>
  ({ type: actionTypes.GET_ALL_DOCUMENTS_SUCCESS, documents });

export const getAllDocumentsFailure = () =>
  ({ type: actionTypes.GET_ALL_DOCUMENTS_FAILURE });

export const getAllDocuments = (searchData) => {
  const { limit, offset } = searchData;
  return dispatch =>
    ajaxCall.get(`/documents/?limit=${limit}offset=${offset}`)
      .then((response) => {
        dispatch(createDocumentSuccess(response.data));
        Materialize.toast(
          'Document Saved',
          3000
        );
      })
      .catch((error) => {
        dispatch(createDocumentFailure());
        Materialize.toast(error.response.data.message, 3000);
      });
};

