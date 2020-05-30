const addressSuccessAllFlds = {
    flat_building_name : "18/P Jannagar Road",
    locality : "Mahesh",
    city : "Serampore",
    pincode : "712202",
    state_uuid : "009ae262-a234-11e8-b475-720006ceb890"
}

const addressSuccessAllFlds2 = {
    flat_building_name : "201 Kalaberia Road",
    locality : "Rajarhat",
    city : "NewTown",
    pincode : "700120",
    state_uuid : "009ae262-a234-11e8-b475-720006ceb890"
}

const addressFailureFldsEmpty1 = {
    locality : "Rajarhat",
    city : "NewTown",
    pincode : "700120",
    state_uuid : "009ae262-a234-11e8-b475-720006ceb890"
}

const addressFailureFldsEmpty2 = {
    flat_building_name : "201 Kalaberia Road",
    city : "NewTown",
    pincode : "700120",
    state_uuid : "009ae262-a234-11e8-b475-720006ceb890"
}

const addressFailureFldsEmpty3 = {
    flat_building_name : "18/P Jannagar Road",
    locality : "Mahesh",
    pincode : "712202",
    state_uuid : "009ae262-a234-11e8-b475-720006ceb890"
}

const addressFailureFldsEmpty4 = {
    flat_building_name : "18/P Jannagar Road",
    locality : "Mahesh",
    city: "Serampore",
    state_uuid : "009ae262-a234-11e8-b475-720006ceb890"
}

const addressFailureFldsEmpty5 = {
    flat_building_name : "18/P Jannagar Road",
    locality : "Mahesh",
    city: "Serampore",
    pincode: "712202",
}

const addressFailureUnmatchedState = {
    flat_building_name : "18/P Jannagar Road",
    locality : "Mahesh",
    city : "Serampore",
    pincode : "712202",
    state_uuid : "009ae262-a234-11e8-b475-720006zeb899"
}

const addressFailurefldInvalidPin = {
    flat_building_name : "18/P Jannagar Road",
    locality : "Mahesh",
    city : "Serampore",
    pincode : "7122020",
    state_uuid : "009ae262-a234-11e8-b475-720006ceb890"
}

module.exports= {
    addressSuccessAllFlds,
    addressSuccessAllFlds2,
    addressFailureFldsEmpty1,
    addressFailureFldsEmpty2,
    addressFailureFldsEmpty3,
    addressFailureFldsEmpty4,
    addressFailureFldsEmpty5,
    addressFailureUnmatchedState,
    addressFailurefldInvalidPin
}