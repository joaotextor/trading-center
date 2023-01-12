import { DeleteForever } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDropzone } from 'react-dropzone'
import { ThumbBox } from './styles'


export default function FileUpload({ files, errors, touched, setFieldValue }) {

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFile) => {
            const newFiles = acceptedFile.map(file => {
                return {
                    ...file,
                    preview: URL.createObjectURL(file)
                }
                // Equivalent to:
                // const object = {
                //     ...file,
                //     preview: URL.createObjectURL(file)
                // }
                // return object
            })

            setFieldValue('files',[
                ...files,
                ...newFiles
            ])
        }
    })

    //! Using file.path will cause a bug in which if the user uploads 2 ore more files with the same name, all of them will be deleted at once when deleting one of them.
    const handleRemoveFile = filePath => {
        console.log(filePath, files)
        const newFileState = files.filter(file => file.path !== filePath )

        setFieldValue('files', newFileState)
    }

    return (
        <>
            <Typography component="h6" variant="h6" color={errors && touched ? 'error' : 'primary'}>
                Images
            </Typography>
            <Typography component="div" variant="body2" color={errors && touched ? 'error' : 'primary'}>
                The first image will be your ad&apos;s cover picture.
            </Typography>
            {
                errors && touched
                ? <Typography variant="body2" color="error" gutterBottom>{errors}</Typography>
                : null
            }
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '10px',
                }}>
                <ThumbBox className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography color={errors ? 'error' : 'primary'}>
                        Click to select or drag image here
                    </Typography>
                </ThumbBox>

                {
                    files.map((file, index) => (
                        <ThumbBox 
                        key={`${file.path}-${index}`}
                        className="thumb-img"
                        sx={{
                            backgroundImage: `url(${file.preview})`,
                            backgroundPosition: 'center'
                        }}>
                            <ThumbBox className="thumb-mask">
                                <IconButton color="secondary" onClick={() => handleRemoveFile(file.path)}>
                                    <DeleteForever fontSize="large"/>    
                                </IconButton>   
                            </ThumbBox>

                            {
                                index === 0 ?
                                <ThumbBox className="lbl-main-img">
                                    <Typography>
                                        Main
                                    </Typography>
                                </ThumbBox>
                                : null
                            }
                            
                        </ThumbBox>
                    )
                    )
                }

            </Box>
        </>
    )
}