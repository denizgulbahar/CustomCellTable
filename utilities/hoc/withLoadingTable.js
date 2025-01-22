import React, { useState } from 'react';
import Loading from '../../components/loading/loading';

export const withLoadingTable = (TableComponent) => {
    return (props) => {

        const [isLoadingTable, setIsLoadingTable] = useState(false);
        const updateLoadingTable = (state) => {
            setIsLoadingTable(state)
        }
        return (isLoadingTable ? (
            <Loading message="Tablo Yükleniyor, lütfen bekleyiniz..." />
            ) : (
            <TableComponent {...props} updateLoadingTable={updateLoadingTable} />
            )
        )
    }
}
