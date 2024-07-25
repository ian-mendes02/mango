import {useMemo, Children} from 'react';
import {list} from '../utils/strings';

export function Gallery( {children, className} ) {

    function Panel( {children, content, className} ) {
        const innerPanels = useMemo( () => {
            var p = Children.toArray( children )?.map(
                ( i, k ) => <Panel
                    key={k}
                    content={i}
                    className={i.props.className}
                />
            );
            return p.length > 0 ? p : undefined;
        }, [children] );

        return innerPanels
            ? (
                <div className={className}>
                    {innerPanels}
                </div>
            )
            : (
                <div
                    className={list( 'bg-cover bg-center rounded-lg shadow-md', content.props.className )}
                    style={{backgroundImage: `url(${content.props.src || '/img/placeholder.webp'})`}}
                ></div>
            );
    }

    return (
        <div className={list( 'relative flex flex-wrap', className )}>
            {children?.map(
                ( i, k ) => <Panel
                    key={k}
                    content={i}
                    className={i.props.className}
                >{i.props.children}</Panel>
            )}
        </div>
    );
}