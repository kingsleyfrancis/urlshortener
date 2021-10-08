import axios from "axios";

export const baseUrl = 'http://localhost:8080';

const BaseApi = {
  getApi: async (url) => {
    try {
    
        let callUrl = `${baseUrl}${url}`;

      const response = await axios(callUrl, {
        method: "GET",
      });

      if (response && response.data) {
        return {
          succeeded: response.data.isSuccessful,
          body: response.data.result,
          message: response.data.message,
          shortId: response.data.shortId,
        };
      } else {
        return { succeeded: false, message: "Get failed" };
      }
    } catch (e) {
      console.error(e);
      return { succeeded: false, body: e, message: "An error occurred" };
    }
  },

  postApi: async (url, data) => {
    try {
        let callUrl = `${baseUrl}${url}`;

      let payload = {
        method: "POST",
        headers: {'Content-Type': 'application/json'}
      };

      if (data) {
        payload.data = JSON.stringify(data);
      }

      const response = await axios(callUrl, payload);

      if (response && response.status === 200) {
        return {
          succeeded: response.data.isSuccessful,
          body: response.data,
          message: response.data.message,
        };
      } else {
        return { succeeded: false, message: "Post failed" };
      }
    } catch (e) {
      console.error(e);
      return { succeeded: false, body: e, message: "An error occurred" };
    }
  },

  putApi: async (url, data) => {
    try {
        let callUrl = `${baseUrl}${url}`;

      let obj = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'}
      };

      if (data) {
        obj.data = JSON.stringify(data);
      }

      const response = await axios(callUrl, obj);

      if (response && response.status === 200) {
        return {
          succeeded: response.data.isSuccessful,
          body: response.data.data,
          message: response.data.message,
        };
      } else {
        return { succeeded: false, message: "Put failed" };
      }
    } catch (e) {
      console.error(e);
      return { succeeded: false, body: e, message: "An error occurred" };
    }
  },

  patchApi: async (url, data) => {
    try {
        let callUrl = `${baseUrl}${url}`;

      let obj = {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'}
      };

      if (data) {
        obj.data = JSON.stringify(data);
      }

      const response = await axios(callUrl, obj);

      if (response && response.status === 200) {
        return {
          succeeded: response.data.isSuccessful,
          body: response.data.data,
          message: response.data.message
        };
      } else {
        return { succeeded: false, message: "Patch failed" };
      }
    } catch (e) {
      console.error(e);
      return { succeeded: false, body: e, message: "An error occurred" };
    }
  },

  deleteApi: async (url, data) => {
    try {
        let callUrl = `${baseUrl}${url}`;

      let request = {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
      };

      if (data) {
        request.data = JSON.stringify(data);
      }

      const response = await axios(callUrl, request);

      if (response && response.status === 200) {
        return {
          succeeded: response.data.isSuccessful,
          body: response.data.data,
          message: response.data.message
        };
      } else {
        return { succeeded: false, message: "Delete failed" };
      }
    } catch (e) {
      console.error(e);
      return { succeeded: false, body: e, message: "An error occurred" };
    }
  },
};

export default BaseApi;
