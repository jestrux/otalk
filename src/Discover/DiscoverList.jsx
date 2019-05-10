import React from 'react';

import useScreenSize from "../hooks/useScreenSize";
import DiscoverItem from './DiscoverItem';

const DiscoverList = ({ people }) => {
    const { isLarge } = useScreenSize();

    return ( 
        <div id="peopleList" className={ isLarge ? 'for-large' : '' }>
            { people.map( person =>
                <DiscoverItem 
                    type={ isLarge ? 'card' : 'item' }
                    key={person.id} 
                    person={ person } 
                />
            )}
        </div>
    );
}
 
export default DiscoverList;