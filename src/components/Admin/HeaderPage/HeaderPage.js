import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderPage.css";

export function HeaderPage(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo, color } = props;
  return (
    <div className="header-page-admin">
      {/*<h1>{title}</h1>*/}

      <h1>{title}</h1>

      <div>
        {btnTitle && (
          <Button color={color} onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button color={color} onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}
