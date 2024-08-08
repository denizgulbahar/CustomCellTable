import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../../../../styles/color';
import ButtonOriginal from '../../../button/buttonOriginal';

const Pagination = ({ data, setData }) => {

  const { 
    itemsPerPage, 
    currentData, 
    currentPage, 
    pageNumbers 
  } = data;

  const handlePageChange = useCallback(
    (pageNumber) => {
      const newStartIndex = (pageNumber - 1) * itemsPerPage;
      const newEndIndex = newStartIndex + itemsPerPage;
      const newData = currentData.slice(newStartIndex, newEndIndex);
      setData((prevData) => ({
        ...prevData,
        currentPage: pageNumber,
        startIndex: newStartIndex,
        endIndex: newEndIndex,
        pagedData: newData,
      }));
    },
    [itemsPerPage, currentData, setData]
  );

  const activePageButtonStyle = useMemo(() => ({
    backgroundColor: color.blue,
  }), []);

  const pageNumberTextStyle = useMemo(() => ({
    color: color.white,
    fontSize: 16,
  }), []);

  if (!pageNumbers) {
    return false;
  }

  return (
    <View style={styles.pagination}>
      {pageNumbers.map((pageNumber) => (
        <ButtonOriginal
          key={pageNumber}
          title={pageNumber}
          buttonStyle={[styles.pageItem, pageNumber === currentPage && activePageButtonStyle]}
          textStyle={pageNumberTextStyle}
          onPress={() => handlePageChange(pageNumber)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: 20,
  },  
  pageItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 25,
    height: 25,
  },
});

export default Pagination;
