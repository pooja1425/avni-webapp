import React from "react";
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  SaveButton,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  Toolbar,
  required,
  number
} from "react-admin";
import { None } from "../common/components/utils";
import { isNil } from "lodash";
import { Title } from "./components/Title";

export const LocationTypeList = props => (
  <List
    {...props}
    bulkActions={false}
    title="Location Types"
    sort={{ field: "level", order: "DESC" }}
  >
    <Datagrid rowClick="show">
      <TextField label="Location Type" source="name" />
      <TextField label="Level" source="level" />
      <ReferenceField
        label="Parent"
        source="parentId"
        reference="addressLevelType"
        linkType="show"
        allowEmpty
      >
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);

const ParentReferenceField = props => {
  return isNil(props.record.parentId) ? (
    <None />
  ) : (
    <ReferenceField
      {...props}
      source="parentId"
      linkType="show"
      reference="addressLevelType"
      allowEmpty
    >
      <FunctionField render={record => record.name} />
    </ReferenceField>
  );
};

ParentReferenceField.defaultProps = {
  addLabel: true
};

export const LocationTypeDetail = props => (
  <Show {...props} title={<Title title={"Location Type"} />}>
    <SimpleShowLayout>
      <TextField label="Location Type" source="name" />
      <TextField label="Level" source="level" />
      <ParentReferenceField label="Parent Type" />
      <TextField label="Created by" source="createdBy" />
      <TextField label="Last modified by" source="lastModifiedBy" />
      <TextField label="Created On(datetime)" source="createdDateTime" />
      <TextField label="Last modified On(datetime)" source="lastModifiedDateTime" />
    </SimpleShowLayout>
  </Show>
);

const CreateEditToolbar = ({ edit, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    {edit && <DeleteButton undoable={false} disabled={!props.record.voidable} />}
  </Toolbar>
);

const LocationTypeForm = ({ edit, ...props }) => {
  return (
    <SimpleForm toolbar={<CreateEditToolbar edit={edit} />} {...props} redirect="show">
      <TextInput source="name" label="Name" validate={required()} />
      <TextInput source="level" label="Level" validate={[required(), number()]} />
      {edit ? (
        <ParentReferenceField label="Parent Type" />
      ) : (
        <ReferenceInput source="parentId" reference="addressLevelType" label="Parent">
          <SelectInput optionText="name" resettable />
        </ReferenceInput>
      )}
    </SimpleForm>
  );
};

export const LocationTypeCreate = props => (
  <Create {...props} title="Add new Location Type">
    <LocationTypeForm />
  </Create>
);

export const LocationTypeEdit = props => (
  <Edit {...props} title="Modify Location Type" undoable={false}>
    <LocationTypeForm edit />
  </Edit>
);
