import React, { useState, useEffect } from "react";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import SyntaxHighlighter from "./SyntaxHighlighter";
import { Placeholder, TabsState } from "@storybook/components";
import { useTheme } from "@storybook/theming";

import { List } from "./List";

interface PanelContentProps {
  code: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
}

interface w3CItem {
  extract: string;
  firstColumn: number;
  firstLine: number;
  hiliteLength: number;
  hiliteStart: number;
  lastColumn: number;
  lastLine: number;
  message: string;
  type: string;
}

interface w3CMessages {
  messages : w3CItem[]
}

function getSubstringBetweenQuotes(inputString: string): string {
  // Regular expression to match content between double quotes
  const match = inputString.match(/“(.*?)”/);
  if (match) {
      return match[1];
  }
  return null;
}



export const PanelContent: React.FC<PanelContentProps> = ({ code, showLineNumbers = false, wrapLines = false }) => {
  const theme = useTheme();
  const [errors, setErrors] = useState<w3CItem[] | undefined>();
  const [warnings, setWarnings] = useState<w3CItem[] | undefined>();

  const validateHtml = async (html: string) => {
    const validatorUrl = 'https://validator.w3.org/nu/?out=json';

    const htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Snippet Validation</title>
    </head><body>
            ${html}
        </body></html>
    `;

    
    try {
      const response = await fetch(validatorUrl, {method: 'POST', headers: { 'Content-Type': 'text/html; charset=utf-8', }, body: htmlContent});
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: w3CMessages = await response.json();
      const errorArr: w3CItem[] = [];
      const warningArr : w3CItem []= [];


      data.messages.map((item) => {
        if(item.type ==='error') {
          errorArr.push(item)
        } else {
          warningArr.push(item);
        }
      });

      setErrors(errorArr);
      setWarnings(warningArr);

    } catch (error) {
        console.error('Error validating HTML:', error);
    }
    };

 
  useEffect(() => {
    validateHtml(code);
  }, [code]);

  return (
    <TabsState initial="HTML" backgroundColor={theme.background.hoverable}>
      <div id="HTML" title="HTML" color={theme.color.positive} >
        <SyntaxHighlighter language={"xml"} copyable={true} padded={true} style={style} showLineNumbers={showLineNumbers} wrapLines={wrapLines}>
          {code}
        </SyntaxHighlighter>
      </div>
      <div id="Error" title={`${errors && errors.length >0? errors.length:''} Errors`} color={theme.color.negative}>
        {errors && errors.length > 0 ? (
            <Placeholder>
              <List
                items={errors.map((item, index) => ({
                  title: item.message, // getSubstringBetweenQuotes(item.message)
                  description: item.message,
                  fromTo: `Check line ${item.lastLine}`,
                  extract : item.extract
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No warnings found</p>
            </Placeholder>
          )}
      </div>
      <div id="warning" title={`${warnings && warnings.length >0? warnings.length: ''} Warning`} color={theme.color.warning}>
        {warnings && warnings.length > 0 ? (
            <Placeholder>
              <List
                items={warnings.map((item, index) => ({
                  title: item.message,
                  description: item.message,
                  fromTo: `Check line ${item.lastLine}`,
                  extract : item.extract
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No warnings found</p>
            </Placeholder>
          )}
      </div>
    </TabsState>
  );
};
