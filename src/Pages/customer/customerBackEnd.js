const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export const displayRooms = (sortProducts) => {
  return fetch(`${API}products?sortPro=${sortProducts}&orderPro=desc&limit=9`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const displaySingleRoom = (productId) => {
  return fetch(`${API}room/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const displayCategories = () => {
  return fetch(`${API}categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const displayFilteredProducts = (limit, filters = {}) => {
  const data = {
    limit,
    filters,
  };

  return fetch(`${API}products/filter`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addWish = (userId, token, wishId) => {
  return fetch(`${API}user/reservation`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ userId, wishId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getReservedRooms = (userId, token) => {
  return fetch(`${API}user/${userId}/reservation`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("not data returned!", err);
    });
};

export const removeCustomerReservation = (userId, token, productId) => {
  return fetch(`${API}user/${userId}/reservation/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("not data returned!", err);
    });
};

export const addRoomToUserReservation = (userId, token, wishId) => {
  return fetch(`${API}user/reservation`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ userId, wishId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateRoomPrice = (token, roomId, totalPrice, checkInDate) => {
  return fetch(`${API}room/rentPrice`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ roomId, totalPrice, checkInDate }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
