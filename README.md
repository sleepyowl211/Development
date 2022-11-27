# Development

### Link to Deployed Website
Please visit the website at `https://sleepyowl211.github.io/Development/`

### Goal and Value of the Application
This application creates an online interactive zoo where users can filter, sort, like and unlike the animals, and see their lifespan information. 

### Usability Principles Considered
The user would be able to control the display sequence and conditions of the animal cards. 
- Sorting: only one type of sorting method could be applied at a time. 
- Filtering: when none or all of the filters are selected, all the animals would be displayed. Within each filter type(active time and animal type), the filter applies OR operation. Between the two types, the filter applies AND operation. 
- Reset: the user could reset either by clicking the "reset" button, or undoing the liking, sorting and filtering operations. 

### Organization of Components
The program contains the following variables to keep track of state changes and data display: 
- Data (Object) to display
- User liked list
- Aggregated lifespan information of liked animals
- Applied filter types
- Applied sort method

To render the animal item components, the program would apply the filter, sort the filtered data, and map to components. To get the aggregation and favorite section, the program would track the status change of like and unlike for each animal, and calculate the mean lifespan. 

### How Data is Passed Down Through Components
Each animal is displayed as an AnimalItem component, where the props include information passed on from Json data, liked status, as well as function for aggregation. 

### How the User Triggers State Changes
There are there major user inputs that triggers state change: 
1. Like/Unlike button: changes user "favorite" list
2. Dropdown menu (sorting): changes the sorting method of animals based on lifespan
3. Checkbox (filtering): controls each animal component's display based on given condition
