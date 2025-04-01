export const inputDataWithButton = async (inputData) => {
    const data = await inputData
    if (data.length !== 0) {
      const headings = Object.keys(data[0]);
      const allHeadings = [...headings, "Sil"];
      const outputData = {
        headings: allHeadings,
        data: Object.fromEntries(allHeadings.map(heading => [heading, { "cells": [] }]))
      };
      return outputData;
    } else {
      const outputData = {
        headings: [],
        data: []
      };
      return outputData;
    }

}