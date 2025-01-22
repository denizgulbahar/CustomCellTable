import { Dimensions } from 'react-native'
import React,{ useState, useCallback } from 'react'
import ResponsiveTableCard from "../../components/tableCard/index";
import JSONData from '../../components/tableCard/tableCardFormat.json';
import listDevicePermissionLevels from '../../API/list-devices';
import deleteDeviceData from '../../API/delete-device'
import { useFocusEffect } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/wrapper/screenWrapper';
import { dataSource } from '../../data/dataSource';
import { withLoadingTable } from '../../utilities/hoc/withLoadingTable';
import formatTable from './formatTable';

const { width } = Dimensions.get('window')

const TableScreen = ({ updateLoadingTable }) => {

  const [tableData, setTableData] = useState(JSONData)

  async function handleListTableData() {
    // setData(filteredData...) kısmı - Filterda kullanılacak data, 
    // formatData kısmı - tableda formatlanacak data, 
    // getInputsData kısmı - de cihaz ekleme ve filtrelemede kullanılacak inputların datası
    try {
      // const data = await listDevicePermissionLevels();
      formatData(dataSource)

    } catch (error) {
      console.error('Error handling table data:', error);
    } finally {
      updateLoadingTable(false)
    }

  }
  async function handleDeleteTableData(item) {
    try {
      await deleteDeviceData(item)
      await handleListTableData();
    } catch (error) {
      console.error('Error handling table data:', error);
    }
  }
    // Handle list ve filterOperationsda debounceSeachde çalıştırılır.
    // Burada sadece gelen Datanın formatlanması ve formattedData'nın table'a aktarılması gerçekleşir.
  async function formatData(data) {
    // console.log(data)
    const formattedData = await formatTable({ data, handleDeleteTableData })                
    setTableData(formattedData)
  }
  useFocusEffect(
    useCallback(() => {
      updateLoadingTable(true);
      handleListTableData()
    }, [])
  );
  // HOC - Handling Loading State in Screen Component
  const LoadingWithTable = withLoadingTable(ResponsiveTableCard);
  return (
    <ScreenWrapper>
      <LoadingWithTable data={tableData} />
    </ScreenWrapper>
  )
}
export default TableScreen;
