import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useContextApi } from "../../../lib/hooks/useContexApi";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const CardChart = ({ data, title, sensorName, isShowAllSensors }) => {
  const { changeThem } = useContextApi();
  const bgColor = changeThem ? "#001e3c" : "#fff";
  const colorThem = changeThem ? "#FFF" : "#000";

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const downloadData = (type) => {
    const titles = Object.keys(data[0]);
    const listData = [];
    data.forEach((value) => {
      listData.push(Object.values(value));
    });
    listData.unshift(titles)

    const element = document.createElement("a");

    const file = new Blob([...listData.join("\n")], {
      type: type,
    });
    element.href = URL.createObjectURL(file);
    let fileExtention = "";
    switch (type) {
      case "txt":
        fileExtention = "data.txt";
        break;
      case "csv":
        fileExtention = "data.csv";
        break;
      default:
        fileExtention = "data.xlsx";
        break;
    }
    element.download = fileExtention;
    document.body.appendChild(element);
    element.click();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#FFF",
            border: "1px solid #f3f3f3",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <small style={{ color: "black" }}>{label}</small>
          <br />
          {payload.map((data, index) => (
            <div key={index}>
              <small style={{ color: `${data.color}`, padding: 0 }}>
                {`${data.name} ${data.value}`}
              </small>
              <br />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <Card sx={{ minWidth: 300, mb: 1, backgroundColor: bgColor }}>
      <CardContent>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              downloadData("csv");
              handleClose();
            }}
          >
            export as csv
          </MenuItem>
          <MenuItem
            onClick={() => {
              downloadData("txt");
              handleClose();
            }}
          >
            export as txt
          </MenuItem>
          <MenuItem
            onClick={() => {
              downloadData(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              );
              handleClose();
            }}
          >
            export as xlsx
          </MenuItem>
        </Menu>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{title}</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              onClick={handleOpenMenu}
              startIcon={<DownloadRoundedIcon />}
            >
              export
            </Button>
          </Stack>
        </Stack>
        <AreaChart
          width={isShowAllSensors ? 400 : window.innerWidth - 200}
          height={isShowAllSensors ? 300 : window.innerHeight - 350}
          data={data}
          margin={{
            top: 5,
            right: 2,
            left: 2,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor=" dodgerblue" stopOpacity={0.8} />
              <stop offset="95%" stopColor=" dodgerblue" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="createdAt"
            label={{
              value: "Time",
              position: "bottom",
              fill: colorThem,
            }}
            tick={{ fill: colorThem }}
          />

          <YAxis
            label={{
              value: sensorName,
              angle: -90,
              position: "insideLeft",
              fill: colorThem,
            }}
            tick={{ fill: colorThem }}
          />
          <Tooltip content={<CustomTooltip />} />

          {isShowAllSensors ? (
            <Area
              type="monotone"
              dataKey={sensorName}
              stroke=" dodgerblue"
              fillOpacity={1}
              fill="url(#color3)"
            />
          ) : (
            <>
              <Area
                type="monotone"
                dataKey="Device 1"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#color1)"
              />
              <Area
                type="monotone"
                dataKey="Device 2"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#color2)"
              />
              <Area
                type="monotone"
                dataKey={"Device 3"}
                stroke="dodgerblue"
                fillOpacity={1}
                fill="url(#color3)"
              />
            </>
          )}
          <Legend verticalAlign="top" />
        </AreaChart>
      </CardContent>
    </Card>
  );
};

export default CardChart;
