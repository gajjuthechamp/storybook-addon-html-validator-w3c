import React, { useEffect, useState, useCallback } from "react";
import { useAddonState, useChannel, useParameter } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierHtml from "prettier/plugins/html";
import { Options as PrettierOption } from "prettier";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [{ code }, setState] = useAddonState(ADDON_ID, { code: null });

  const parameters = useParameter(PARAM_KEY, {
    highlighter: { showLineNumbers: false, wrapLines: true },
    prettier: {},
  });

  const {
    highlighter: { showLineNumbers = false, wrapLines = true } = {},
    prettier = {},
  } = parameters;

  const prettierConfig: PrettierOption = React.useMemo(() => ({
    htmlWhitespaceSensitivity: "ignore",
    ...prettier,
    parser: "html",
    plugins: [prettierHtml],
  }), [prettier]);

  const formatCode = useCallback(async (code: string | null) => {
    if (code) {
      try {
        return await prettierFormat(code, prettierConfig);
      } catch (error) {
        console.error(error);
        return code; // Return the original code if formatting fails
      }
    }
    return null;
  }, [prettierConfig]);

  const [formattedCode, setFormattedCode] = useState<string | null>(null);

  useEffect(() => {
    console.log("==================code1-=====")
    console.log(code)
    formatCode(code).then(setFormattedCode);
  }, [code, formatCode]);

  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code }) => {
      setState((state) => ({ ...state, code }));
    },
  });

  return (
    <AddonPanel {...props}>
      <PanelContent code={formattedCode} showLineNumbers={showLineNumbers} wrapLines={wrapLines} />
    </AddonPanel>
  );
};
