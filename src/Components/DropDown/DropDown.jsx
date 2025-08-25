import { useState } from "react";
import "./Dropdown.css";
export default function DropDown({ header, children,headerOptions,containerOptions,bodyOptions }) {
  const [open, setOpen] = useState(false);
  const headerStyle = headerOptions ? headerOptions : undefined;
  const containerStyle = containerOptions? containerOptions: undefined;
  const bodyStyle = bodyOptions? bodyOptions: undefined;
  return (
    <div className="drop-container" style={containerStyle} onClick={() => setOpen(!open)}>
      <div className="drop-header" style={headerStyle}>
        <h2>{header.charAt(0).toUpperCase() + header.slice(1)}</h2>
      </div>

      <div className={`drop-body ${open ? "open" : ""}`} style={bodyStyle}>{children}</div>
    </div>
  );
}
