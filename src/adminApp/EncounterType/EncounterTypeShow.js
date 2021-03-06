import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import http from "common/utils/httpClient";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Title } from "react-admin";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import Moment from "react-moment";
import Grid from "@material-ui/core/Grid";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { ShowSubjectType, ShowPrograms } from "../WorkFlow/ShowSubjectType";

const EncounterTypeShow = props => {
  const [encounterType, setEncounterType] = useState({});
  const [editAlert, setEditAlert] = useState(false);
  const [formMapping, setFormMapping] = useState([]);
  const [subjectType, setSubjectType] = useState([]);
  const [program, setProgram] = useState([]);

  useEffect(() => {
    http
      .get("/web/encounterType/" + props.match.params.id)
      .then(response => response.data)
      .then(result => {
        setEncounterType(result);
      });

    http
      .get("/web/operationalModules")
      .then(response => {
        setFormMapping(response.data.formMappings);
        setSubjectType(response.data.subjectTypes);
        setProgram(response.data.programs);
      })
      .catch(error => {});
  }, []);

  return (
    <>
      <Box boxShadow={2} p={3} bgcolor="background.paper">
        <Title title={"Encounter Type : " + encounterType.name} />
        <Grid container item sm={12} style={{ justifyContent: "flex-end" }}>
          <Button color="primary" type="button" onClick={() => setEditAlert(true)}>
            <EditIcon />
            Edit
          </Button>
        </Grid>
        <div className="container" style={{ float: "left" }}>
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Name</FormLabel>
            <br />
            <span style={{ fontSize: "15px" }}>{encounterType.name}</span>
          </div>
          <p />
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Subject type</FormLabel>
            <br />
            <ShowSubjectType
              rowDetails={encounterType}
              subjectType={subjectType}
              formMapping={formMapping}
              entityUUID="encounterTypeUUID"
            />
          </div>
          <p />
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Program</FormLabel>
            <br />
            <ShowPrograms
              rowDetails={encounterType}
              program={program}
              formMapping={formMapping}
              setMapping={setFormMapping}
            />
          </div>
          <p />
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Organisation Id</FormLabel>
            <br />
            <span style={{ fontSize: "15px" }}>{encounterType.organisationId}</span>
          </div>
          <p />
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Encounter Eligibility Check Rule</FormLabel>
            <br />
            <Editor
              readOnly
              value={
                encounterType.encounterEligibilityCheckRule
                  ? encounterType.encounterEligibilityCheckRule
                  : ""
              }
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 15,
                height: "auto",
                borderStyle: "solid",
                borderWidth: "1px"
              }}
            />
          </div>
          <p />

          <div>
            <FormLabel style={{ fontSize: "13px" }}>Created by</FormLabel>
            <br />
            <span style={{ fontSize: "15px" }}>{encounterType.createdBy}</span>
          </div>
          <p />
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Last modified by</FormLabel>
            <br />
            <span style={{ fontSize: "15px" }}>{encounterType.lastModifiedBy}</span>
          </div>
          <p />
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Created on(datetime)</FormLabel>
            <br />
            <span style={{ fontSize: "15px" }}>
              <Moment parse="YYYY-MM-DD HH:mm::ss">{encounterType.createdDateTime}</Moment>
            </span>
          </div>
          <p />
          <div>
            <FormLabel style={{ fontSize: "13px" }}>Last modified on(datetime)</FormLabel>
            <br />
            <span style={{ fontSize: "15px" }}>
              <Moment parse="YYYY-MM-DD HH:mm::ss">{encounterType.modifiedDateTime}</Moment>
            </span>
          </div>
        </div>

        {editAlert && <Redirect to={"/appDesigner/encounterType/" + props.match.params.id} />}
      </Box>
    </>
  );
};

export default EncounterTypeShow;
