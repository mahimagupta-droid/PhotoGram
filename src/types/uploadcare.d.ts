import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lr-config": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "ctx-name"?: string;
        pubkey?: string;
        multiple?: boolean;
        imgOnly?: boolean;
        confirmUpload?: boolean;
        removeCopyright?: boolean;
      };

      "lr-file-uploader-regular": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "ctx-name"?: string;
        "css-src"?: string;
      };

      "lr-upload-ctx-provider": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "ctx-name"?: string;
        ref?: React.Ref<any>;
      };
    }
  }
}