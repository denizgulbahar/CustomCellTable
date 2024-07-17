// Adding Modal key to End to Headers

export const inputDataWithModal= async (inputData) => {
    const data = await inputData 
    if (data.length !== 0) {
      const headings = Object.keys(data[0]);
      const allHeadings = [...headings, "Modal"];
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