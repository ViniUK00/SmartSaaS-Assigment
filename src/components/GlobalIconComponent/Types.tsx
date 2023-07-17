export type IconTypes = {
  /** optional string text near to the icon props must me passed as a string */
  text?: string;
  /** mandatory JSX.Element that sets the icon of the pressable component */
  icon?: JSX.Element;
  /** optional light or dark theme for the pressable component dafault will be light*/
  darkTheme?: boolean;
  /** mandatory promise function */
  onPress: () => Promise<any>;
  /** optional function for onSuccess what should we do after success response */
  onSuccess?: Function;
  /** optional function  what should we do after Error in our response */
  onError?: Function;
  /** optional string  to change icon color */
  iconColor?: string;
  /** optional string  to change backgound color */
  backgroundColor?: string;
  /** optional string  to change backgound color when you hover over with the mouse in webview */
  onHoverColor?: string;
  /** optional number  to change font size */
  fontSize?: number;
};
