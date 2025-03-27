import { useChannel } from "@storybook/preview-api";
import type { Renderer, PartialStoryFn as StoryFunction } from "@storybook/types";
import { EVENTS } from "./constants";
import { Parameters } from "./types";

export const withHTML = (
  storyFn: StoryFunction<Renderer>,
  {
    parameters: { html: parameters = {} } = {},
  }: { parameters?: { html?: Parameters } } = {},
) => {
  const emit = useChannel({});

  setTimeout(() => {
    const rootSelector = parameters.root || "#storybook-root, #root";
    const root = document.querySelector(rootSelector);
    
    if (!root) {
      emit(EVENTS.CODE_UPDATE, { code: `${rootSelector} not found.`, options: parameters });
      return;
    }

    let code = root.innerHTML;

    if (parameters.removeEmptyComments) {
      code = code.replace(/<!--\s*-->/g, "");
    }

    if (parameters.removeComments) {
      const removeAllComments = parameters.removeComments === true;
      const commentRegex = removeAllComments ? /<!--[\S\s]*?-->/g : /<!--([\S\s]*?)-->/g;

      code = code.replace(commentRegex, (match, p1) => {
        return removeAllComments || (parameters.removeComments instanceof RegExp && parameters.removeComments.test(p1))
          ? ""
          : match;
      });
    }

    if (typeof parameters.transform === "function") {
      try {
        code = parameters.transform(code);
      } catch (error) {
        console.error(error);
      }
    }

    emit(EVENTS.CODE_UPDATE, { code, options: parameters });
  }, 0);


  return storyFn();
};
