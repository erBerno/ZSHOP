import React from "react";
import Link from "next/link";

import Navigator from "../Elements/Navigator";
import MenuFunctionIcons from "../Elements/MenuFunctionIcons";
import { renderContainer } from "../../../common/utils";

export default function MenuThree({ hide, container }) {
  const logoUrl = "http://127.0.0.1:8090/api/files/fs7yoxirvx8dxtl/gl9bc9cf6d6x723/image_1lns_h1d_nwx_QRXFd61F8n.png?token=";
  return (
    <div className="menu -style-3">
      <div className={renderContainer(container)}>
        <div className="menu__wrapper">
        <Link href="/homepages/homepage1">
            <a className="menu__wrapper__logo">
              <img src={logoUrl} alt="Logo" />
            </a>
          </Link>
          <Navigator className="-white" />
          <MenuFunctionIcons hide={hide} white className="-white" />
        </div>
      </div>
    </div>
  );
}
