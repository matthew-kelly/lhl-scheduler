import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getByAltText,
  getByPlaceholderText,
  getAllByTestId,
  queryByText,
} from '@testing-library/react';

import Application from 'components/Application';

import axios from 'axios';

afterEach(cleanup);

describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
  });

  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    const day = getAllByTestId(container, 'day').find((item) =>
      queryByText(item, 'Monday')
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find((appt) =>
      queryByText(appt, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, 'Add'));
    const day = getAllByTestId(container, 'day').find((item) =>
      queryByText(item, 'Monday')
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for the first day the same', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find((appt) =>
      queryByText(appt, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    const day = getAllByTestId(container, 'day').find((item) =>
      queryByText(item, 'Monday')
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, 'Save'));
    await waitForElement(() =>
      getByText(appointment, 'Unable to save the appointment')
    );
    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(getByAltText(appointment, 'Add')).toBeInTheDocument();
  });

  it('shows the delete error when failing to delete an existing appointments', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find((appt) =>
      queryByText(appt, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();
    axios.delete.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, 'Unable to cancel the appointment')
    );
    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
  });
});
