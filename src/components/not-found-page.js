import React from "react";
import LinkButton from "./ui/link-button";
import { ROUTES } from "./utils/routes";

function NotFoundPage() {
  return (
    <div className="w-full max-w-[692px] text-center h-fit">
      <h2 className="text-3xl font-semibold text-orange-500 mb-5">
        Page Not Found.
      </h2>
      <div className="w-full flex justify-center items-center">
      <LinkButton
          href={ROUTES.HOME}
          className="h-11 w-full !text-light sm:h-12"
          size="medium"
        >
          Back to home
        </LinkButton>
      </div>
    </div>
  );
}

export default NotFoundPage;
