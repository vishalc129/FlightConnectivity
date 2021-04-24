import { StateType, ActionType } from 'typesafe-actions';

export type Store = StateType<typeof import('./store/index').default>;
export type RootState = StateType<ReturnType<typeof import('./features/root.reducer').default>>;

export type AirportConnectionBuilderState = {
    readonly airportConnectionBuilder: any;
};

