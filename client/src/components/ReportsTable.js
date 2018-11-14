import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HttpClient from '../services/HttpClient';
import FloatingButtons from './FloatingButtons';
import XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';

const styles = theme => ({
  root: {
    width: '95%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: '90px',
    margin: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class ReportsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportsData: [],
      statisticsPerHour: []
    };
    this.loadReports();
  }

  loadReports = () => {
    console.log('click');
    new HttpClient('/reports').get()
      .then((reports) => {
        console.log(reports);
        this.setState({
          reportsData: reports.data.length > 0 ? reports.data : [],
          statisticsPerHour: reports.statisticsPerHour
        });
      });
  }

  downloadClick = () => {
    let wb = XLSX.utils.book_new();
    let final_json_array = [];
    this.state.reportsData.forEach(report => {
      final_json_array.push({
        'Username': report.consumerId.username, 'Action': report.action, 'Text': report.text
      });
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(final_json_array), "Reports");
    XLSX.writeFile(wb, "rr-services.xlsx");
  };

  render() {
    const { classes } = this.props;
    const data = {
      labels: [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", 
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
      ],
      datasets: [
        {
          label: "Bugs",
          backgroundColor: 'rgb(240, 98, 146)',
          fill: false,
          borderColor: 'rgb(240, 98, 146)',
          data: this.state.statisticsPerHour.map(elem => elem.bugs),
        },
        {
          label: "Feedbacks",
          backgroundColor: 'rgb(77, 208, 225)',
          fill: false,
          borderColor: 'rgb(77, 208, 225)',
          data: this.state.statisticsPerHour.map(elem => elem.feddBacks),
        },
        {
          label: "Beta testers requests",
          backgroundColor: 'rgb(255, 213, 79)',
          fill: false,
          borderColor: 'rgb(255, 213, 79)',
          data: this.state.statisticsPerHour.map(elem => elem.betaTesterRequests),
        }
      ]
    }
    return (
      <div>
        <Line data={data} height={100} options={{
          layout: {
            padding: {
              top: 30,
              bottom: 30,
              left: 25,
              right: 50
            }
          },
          title: {
            display: true,
            text: `Customer statistics ${new Date().toLocaleDateString()}`
          }
        }}/>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                {/* <TableCell numeric>Calories</TableCell> */}
                <TableCell>Action</TableCell>
                <TableCell>Text</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reportsData.map((report, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      { report.consumerId.username }
                    </TableCell>
                    <TableCell>{ report.action }</TableCell>
                    <TableCell>{ report.text }</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <FloatingButtons downloadClick={this.downloadClick} reloadClick={this.loadReports}/>
      </div>
    );
  }
}

ReportsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportsTable);