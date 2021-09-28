https://www.youtube.com/watch?v=EMvhdm1N0-Q
https://www.youtube.com/watch?v=0DYELZ6ynlU



import InvestmentPrivateRoute from "./app/InvestmentPrivateRoute"



export default function arif() {
@@ -45,7 +46,7 @@ export default function arif() {

        <Route exact path="/invite" component={(props) => <AppContainer {...props}><Invite {...props} /></AppContainer>} />

        <Route path="/invite" component={(props) => <AppContainer {...props}><Invite {...props} /></AppContainer>} />

        <Route exact path="/welcomeBack" component={(props) => <AppContainer {...props}><Invite {...props} /></AppContainer>} />

        <Route path="/home" component={(props) => <InvestmentAppContainer {...props}><InvestmentHome {...props} /></InvestmentAppContainer>} />

        <InvestmentPrivateRoute path="/home" component={(props) => <InvestmentAppContainer {...props}><InvestmentHome {...props} /></InvestmentAppContainer>} />

        <Route exact path="/allWeather" component={(props) => <InvestmentAppContainer {...props}><Weather {...props} /></InvestmentAppContainer>} />

        <Route exact path="/redemptionConfirmation" component={(props) => <InvestmentAppContainer {...props}><RedemptionConfirmation {...props} /></InvestmentAppContainer>} />

        <Route exact path="/userProfile" component={(props) => <InvestmentAppContainer {...props}><ProfilePage {...props} /></InvestmentAppContainer>} />
		
		
		

		




import { Route, Redirect } from 'react-router';

import {  useEffect, useState } from 'react';


const InvestmentPrivateRoute = ({component: Component, ...rest}) => {

	const [authed, setAuthed] = useState(null)


	useEffect( () => {

		const token = localStorage.getItem("token")

		if(token && token !== "")

			setAuthed(true)

		else 

			setAuthed(false)

	}, [])


	return (

		<Route 

			{...rest}

			render={ (props) => authed === true? (

				<Component {...props}/>):

				(authed === false)? 

					<Redirect to={{pathname: '/investment', state: {from: props.location}}}/>

					: null

			}

		/>

	)

}


export default InvestmentPrivateRoute;
