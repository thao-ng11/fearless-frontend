// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get("jwt_access_payload");
console.log("payload here:", payloadCookie);
// FINISH THIS
if (payloadCookie) {
  //   // The cookie value is a JSON-formatted string, so parse it
  // const encodedPayload = JSON.parse(payloadCookie, payloadCookie.value);
  // console.log('encodePayload here:', encodedPayload);
  //   // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(payloadCookie.value);
  console.log("decodedPayload here:", decodedPayload);

  //   // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload);

  // //   // Print the payload
  console.log(payload);

  // //   // Check if "events.add_conference" is in the permissions.
  // //   // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes("events.add_conference")) {
    const newConferenceTag = document.querySelector("#new_conference");
    newConferenceTag.classList.remove("d-none");
  }

  // //   // Check if "events.add_location" is in the permissions.
  // //   // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes("events.add_location")) {
    const newLocationTag = document.querySelector("#new_location");
    newLocationTag.classList.remove("d-none");
  }
}
