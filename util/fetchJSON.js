const fetchJSON = async (input) => (await fetch(input)).json();
exports.fetchJSON = fetchJSON;
