import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  const getContactList = () => {
    fetch("https://playground.4geeks.com/contact/agendas/more/contacts")
      .then((res) => {
        if (!res.ok) throw new Error("Error loading contacts");
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: "set_contacts",
          payload: data.contacts,
        });
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  };

  const deleteContact = (idToDelete) => {
    fetch(`https://playground.4geeks.com/contact/agendas/more/contacts/${idToDelete}`, {
      method: "DELETE",
    })
      .then(() => {
        getContactList();
      });
  };

  useEffect(() => {
    getContactList();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <ul className="list-group">
        {store?.contacts?.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <img
                src="https://img.freepik.com/vector-premium/icono-persona-contacto-negro-sobre-fondo-blanco_833641-1126.jpg?w=360"
                alt="Contact avatar"
                className="rounded-circle me-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />

              <div>
                <h4 className="mb-1 fw-normal"> 
                  {item.name}
                </h4>
                <p className="mb-1">
                  <i className="fas fa-phone me-2 text-secondary"></i>
                  {item.phone}
                </p>
                <p className="mb-1">
                  <i className="fas fa-envelope me-2 text-secondary"></i>
                  {item.email}
                </p>
                <p className="mb-1">
                  <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                  {item.address}
                </p>
              </div>
            </div>

            <button
              onClick={() => deleteContact(item.id)}
              className="btn btn-link p-0 text-dark"
              style={{ fontSize: '1.2rem' }}
              >
              <i className="fas fa-trash me-1"></i>
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
};