import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import FadeLoader from "react-spinners/FadeLoader";

export default function App() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get("/api/addresses");
      setAddresses(data.addresses);
    })();
  }, []);

  async function handleSaveAddress() {
    setLoading(true);
    try {
      const { data, status } = await axios.post("/api/addresses", {
        address: {
          city: newAddress
        }
      });
      if (status === 201) {
        setAddresses([...addresses, data.address]);
        setNewAddress("");
      }
      setError(false);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className="App">
      {isError ? <h1> Error Occured</h1> : <h1> address book </h1>}
      <input
        type="text"
        value={newAddress}
        placeholder="enter city"
        onChange={(event) => {
          const { value } = event.target;
          setNewAddress(value);
        }}
      />
      <button onClick={handleSaveAddress}> Save Address </button>
      {isLoading ? (
        <FadeLoader loading={isLoading} />
      ) : (
        <ul>
          {addresses.map((address) => (
            <li key={address.id}>{address.city}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
