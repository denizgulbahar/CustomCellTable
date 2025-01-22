import { Dimensions, StyleSheet } from 'react-native'
import React,{ useState, useCallback } from 'react'
import ResponsiveTableCard from "../../components/tableCard/index";
import JSONData from '../../components/tableCard/tableCardFormat.json';
import listDevicePermissionLevels from '../../API/list-devices';
import updateDeviceData from '../../API/update-device'
import deleteDeviceData from '../../API/delete-device'
import Loading from '../../components/loading/loading';
import formatDevice from './formatDevice';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/wrapper/screenWrapper';
import formatDeviceMock from './formatDeviceMock';
import { dataSource } from '../../data/dataSource';

const { width } = Dimensions.get('window')

const DeviceScreen = () => {

  const [tableData, setTableData] = useState(JSONData)
  const [isLoadingTable, setIsLoadingTable] = useState(false)

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
      setIsLoadingTable(false)
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
  async function handleUpdateTableData(data, item, key) {
    try {
      await updateDeviceData(data, item, key)
      await handleListTableData();
    } catch (error) {
      console.error('Error handling table data:', error);
    }
  }
    // Handle list ve filterOperationsda debounceSeachde çalıştırılır.
    // Burada sadece gelen Datanın formatlanması ve formattedData'nın table'a aktarılması gerçekleşir.
  async function formatData(data) {
    // console.log(data)
    const formattedData = await formatDevice(
      data,
      handleUpdateTableData,
      handleDeleteTableData,
    )                
    setTableData(formattedData)
  }
  useFocusEffect(
    useCallback(() => {
      setIsLoadingTable(true);
      handleListTableData()
    }, [])
  );
  
  return (
    <ScreenWrapper>
    {isLoadingTable ? (
      <Loading message="Tablo Yükleniyor, lütfen bekleyiniz..." />
    ) : (
        <ResponsiveTableCard data={tableData} />
    )}
  </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default DeviceScreen;
