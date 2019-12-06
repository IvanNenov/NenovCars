import * as React from 'react';
import AdsContainer from '../AdsContainer/AdsContainer';

interface FavoriteCarsProps {

}

interface FavoriteCarsState {

}

export default class FavoriteCars extends React.Component<FavoriteCarsProps, FavoriteCarsState> {
    public render() {
        return (
            <div>
                <AdsContainer />
            </div>
        );
    }
}