import { addons, types } from '@storybook/manager-api';
import { Panel } from "./Panel";
import { ADDON_ID, PANEL_ID, PARAM_KEY } from "./constants";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the panel only when necessary
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "HTML Validator",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
    paramKey: PARAM_KEY,
  });
});
