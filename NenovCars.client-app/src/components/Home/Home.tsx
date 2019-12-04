import * as React from 'react';
import AdsContainer from '../AdsContainer/AdsContainer';

interface HomeProps {

}

interface HomeState {

}

export default class Home extends React.Component<HomeProps, HomeState> {
    public render() {
        return (
            <div>
                <AdsContainer />
            </div>
        );
    }
}