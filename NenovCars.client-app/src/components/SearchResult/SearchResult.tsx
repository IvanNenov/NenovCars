import * as React from 'react';
import { Row, Col, Form, Input, Divider, Button } from 'antd';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import AdsContainer from '../AdsContainer/AdsContainer';
import './SearchResult.css';

interface ISearchResultProps {
    adStore?: IAdStore;
}

interface ISearchResultState {
    brand: string;
    priceTo: string;
}

@inject('adStore')
@observer
export default class SearchResult extends React.Component<ISearchResultProps, ISearchResultState> {
    private carBrandInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            brand: event.currentTarget.value
        });
    }

    private carYearInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            priceTo: event.currentTarget.value
        });
    }

    public componentWillUnmount(): void {
        this.props.adStore.searchResults = null;
    }

    public render(): JSX.Element {
        return (
            <>
                <Row type="flex" justify="center">
                    <Divider>Search</Divider>
                    <Col>
                        <Form>
                            <Form.Item>
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.carBrandInputChange(event)}
                                    placeholder="Car brand"
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col className="n-search-field">
                        <Form>
                            <Form.Item>
                                <Input
                                    type="number"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.carYearInputChange(event)}
                                    placeholder="Year up to"
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col className="n-search-field">
                        <Button type="primary" ghost onClick={this.onSearchClick}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {this.props.adStore.searchResults && this.props.adStore.searchResults.allCars && (
                        <Row type="flex" justify="center">
                            <Col>
                                <AdsContainer carsList={this.props.adStore.searchResults.allCars} />
                            </Col>
                        </Row>
                    )}
                </Row>
            </>
        );
    }

    private onSearchClick = (): void => {
        this.props.adStore.getSearchResult(this.state.brand, this.state.priceTo);
    };
}
