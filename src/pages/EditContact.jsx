import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditContact = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const contactToEdit = store.contacts.find(
      (contact) => contact.id === parseInt(id)
    );

    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address,
      });
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editContact = (contactId, updatedData) => {
    fetch(
      `https://playground.4geeks.com/contact/agendas/more/contacts/${contactId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((res) => {
        if (!res.ok) {
          console.error("Error when editing contact", res.status);
          return;
        }
        alert("Contact updated successfully");
        navigate("/");
      })
      .catch((err) =>
        console.error("Error when using PUT method:", err)
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editContact(id, formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Edit Contact</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Save Changes
              </button>

              <div className="text-start">
                <button
                  type="button"
                  className="btn btn-link p-0 text-primary"
                  onClick={() => navigate("/")}
                >
                  or get back to contacts
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
