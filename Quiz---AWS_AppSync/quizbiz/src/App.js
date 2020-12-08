import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify'

import Quiz from './components/Quiz';
import QuizPicker from './components/QuizPicker';

import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
Amplify.Logger.LOG_LEVEL = 'INFO';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuiz: null,
        };
    }

    async componentDidMount() {
        document.title = "QuizBiz";
    }

    setActiveQuiz = (i) => this.setState({activeQuiz: i});

    logout = () => {
        Auth.signOut()
    }

    render() {
        return (
            <div>
                <Segment className="inverted center aligned" style={{minHeight: "200px"}}>
                    <Container>
                        <Header as='h1' textAlign='center' style={{marginTop: '2em', color: 'white'}}>
                            Welcome to QuizBiz
                        </Header>
                        <button onClick={this.logout}>logout</button>
                    </Container>
                </Segment>
                <Container>
                    <QuizPicker
                        activeQuiz={this.state.activeQuiz}
                        propagateQuiz={this.setActiveQuiz} />
                    <Quiz
                        activeQuiz={this.state.activeQuiz} />
                </Container>
            </div>
        );
    }
}

// export default App;
export default withAuthenticator(App, {
    usernameAlias: 'email'
});