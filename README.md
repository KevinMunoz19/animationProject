# React Native Tools and Libraries Showcase

Project developed for developing examples of features, tools, libraries and technologies.

## Environment

* React Native version: 0.63.3
* NodeJS version: 13.7.0

#### Structure

src:
- utils
  - GlobalColors.js : Color palette used in project UI.
  - apollo.js : Apollo client function initialization, in memory cache instance.
- components
  - ButtonCustom.js : Component to display button.
  - FormInput.js : Component to display a TextInput, with title for input.
  - FormPicker.js : Component to display a Picker, with title for picker.
- views
  - Details.js : Details of selected series display. Access from Home and Search views.
  - Home.js : Data display in FlatList for anime series, most popular and best average rating anime. Access from Init view. Can Access Details and Search views. When series is selected, fetch additional info (episodes, genres, characters), and pass it as props to Details view.
  - Init.js : Initial view. Fetchs data for anime series from API, and pass it as props to Home view.
  - Search.js : Fetch for data with text input as filter. Displays result in flatlist, if item is pressed, it fetches additional info and pass it as props to Details view. When list end is reached, it fetches for next records (if there are more records).
  
#### Libraries
- react-native-router-flux : used for navigation. (https://github.com/aksonov/react-native-router-flux)
- react-native-vector-icons : used for icons. (https://github.com/oblador/react-native-vector-icons)
- react-native-indicators:
- faker:
- graphql-tag:
- apollo-client:
