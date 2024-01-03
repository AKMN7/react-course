import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
    return (
        <>
            <Heading as="h1">Update your account</Heading>

            <Row type="vertical">
                <Heading as="h2">Update user data</Heading>
                <UpdateUserDataForm />
            </Row>

            <Row type="vertical">
                <Heading as="h2">Update password</Heading>
                <p>Update user password form</p>
            </Row>
        </>
    );
}

export default Account;
