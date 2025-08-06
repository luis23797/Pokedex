import { useState } from "react";
import "./Dropdown.css";
export default function DropDown({ header, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="drop-container" onClick={() => setOpen(!open)}>
      <div className="drop-header" >
        <h2>{header.charAt(0).toUpperCase() + header.slice(1)}</h2>
      </div>

      <div className={`drop-body ${open ? "open" : ""}`}>{children}</div>
    </div>
  );
}
