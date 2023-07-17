export type SearchComponentTypes = {
  /** use for search string props must me passed as a string */
  search: string;
  /** use as a setter funtion to update the state of the search string */
  setSearch: Function;
  /** optional array of icons that  accepts JSX.Element, by this will generate
   * all the icons necesary for the search component
   */
  icons?: Array<JSX.Element | string>;
  /** optional string that sets the theme of the component available options are
   *  light or dark otherwise it wont have any background color  */
  theme?: "light" | "dark";
  /** optional string that sets a placeholder text in the search input */
  placeHolder?: string;
};
