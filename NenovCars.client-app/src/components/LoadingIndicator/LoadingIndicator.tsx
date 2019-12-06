import * as React from 'react';
import { Icon, Spin } from 'antd';
import './LoadingIndicator.css';

const antIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;

export default class LoadingIndicator extends React.Component {
    public render() {
        return (
            <div className="n-loading-indicator">
                <Spin indicator={antIcon} />
            </div>
        );
    }
}