import React from 'react';
import Loading from '../../components/loading/loading';

export const withLoadingTable = (TableComponent) => {
  return ({ isLoadingTable, data, ...props }) => {
    console.log("tableData:",tab)
    return (
      <>
        <TableComponent {...props} data={data} isLoadingTable={isLoadingTable} />
        {isLoadingTable && <Loading message="Tablo Yükleniyor, lütfen bekleyiniz..." />}
      </>
    );
  };
};

