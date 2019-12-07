import * as React from "react";
import { Result, Button } from "antd";

export default class NotFound extends React.Component {
    public render(): JSX.Element {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" href="/">
                        Back Home
                    </Button>
                }
            />
        );
    }
}
