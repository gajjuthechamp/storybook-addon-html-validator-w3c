import { addons, types } from '@storybook/manager-api';
import { Panel } from "./Panel";
import { ADDON_ID, PANEL_ID, PARAM_KEY} from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, () => {
  // Register a tool
  

  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "HTML Validator",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
    paramKey: PARAM_KEY,
  });


});
