// import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
    return (
        <>
            <GlobalStyles />
            <Row>
                <Heading as="h1">Hello World!</Heading>
                <Button>Test</Button>
                <Button variation="secondary" size="small">
                    Test
                </Button>
            </Row>
            <Row type="vertical">
                <Heading as="h2">Hello World 2!</Heading>
                <Input type="text" placeholder="Name..." />
                <Button>Test</Button>
            </Row>
        </>
    );
}

export default App;
